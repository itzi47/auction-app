from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from datetime import datetime
import uuid

from models import (
    User, Auction, Bid, Comment, BidRequest, CommentRequest, 
    AuctionCreate, AuctionStatus
)
from mock_data import mock_users, mock_auctions, mock_bids, mock_comments

app = FastAPI(
    title="Social Auction API",
    description="A beautiful social auction platform with real-time bidding",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Helper functions
def get_user_auctions(username: str) -> List[Auction]:
    return [auction for auction in mock_auctions.values() if auction.seller_username == username]

def get_user_bids(username: str) -> List[Bid]:
    return [bid for bid in mock_bids if bid.bidder_username == username]

def get_auction_comments(auction_id: str) -> List[Comment]:
    return [comment for comment in mock_comments if comment.auction_id == auction_id]

def get_auction_bids(auction_id: str) -> List[Bid]:
    return [bid for bid in mock_bids if bid.auction_id == auction_id]

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Welcome to Social Auction API", 
        "version": "1.0.0",
        "docs": "/api/docs"
    }

# User endpoints
@app.get("/api/users/{username}", response_model=User)
async def get_user_profile(username: str):
    """Get user profile information"""
    if username not in mock_users:
        raise HTTPException(status_code=404, detail="User not found")
    return mock_users[username]

@app.get("/api/users/{username}/auctions", response_model=List[Auction])
async def get_user_auctions_endpoint(username: str):
    """Get all auctions created by a specific user"""
    if username not in mock_users:
        raise HTTPException(status_code=404, detail="User not found")
    return get_user_auctions(username)

@app.get("/api/users/{username}/bids", response_model=List[Bid])
async def get_user_bids_endpoint(username: str):
    """Get all bids placed by a specific user"""
    if username not in mock_users:
        raise HTTPException(status_code=404, detail="User not found")
    return get_user_bids(username)

# Auction endpoints
@app.get("/api/auctions", response_model=List[Auction])
async def get_auctions(
    category: Optional[str] = Query(None, description="Filter by category"),
    status: Optional[AuctionStatus] = Query(None, description="Filter by status"),
    limit: int = Query(20, ge=1, le=100, description="Number of auctions to return")
):
    """Get list of auctions with optional filtering"""
    auctions = list(mock_auctions.values())
    
    if category:
        auctions = [a for a in auctions if a.category.lower() == category.lower()]
    
    if status:
        auctions = [a for a in auctions if a.status == status]
    
    # Sort by created_at descending (newest first)
    auctions.sort(key=lambda x: x.created_at, reverse=True)
    
    return auctions[:limit]

@app.get("/api/auctions/{auction_id}", response_model=Auction)
async def get_auction_details(auction_id: str):
    """Get detailed information about a specific auction"""
    if auction_id not in mock_auctions:
        raise HTTPException(status_code=404, detail="Auction not found")
    return mock_auctions[auction_id]

@app.post("/api/auctions/{auction_id}/bids", response_model=Auction)
async def place_bid(auction_id: str, bid_request: BidRequest):
    """Place a bid on an auction"""
    if auction_id not in mock_auctions:
        raise HTTPException(status_code=404, detail="Auction not found")
    
    auction = mock_auctions[auction_id]
    
    # Validate bid amount
    if bid_request.bid_amount <= auction.current_bid:
        raise HTTPException(
            status_code=400, 
            detail=f"Bid amount must be higher than current bid of ${auction.current_bid:,.2f}"
        )
    
    # Check if auction is still active
    if auction.status != AuctionStatus.ACTIVE:
        raise HTTPException(status_code=400, detail="Auction is not active")
    
    if auction.end_time <= datetime.now():
        raise HTTPException(status_code=400, detail="Auction has ended")
    
    # Create new bid
    new_bid = Bid(
        id=str(uuid.uuid4()),
        auction_id=auction_id,
        bidder_username=bid_request.bidder_username,
        bid_amount=bid_request.bid_amount,
        timestamp=datetime.now()
    )
    
    # Add bid to mock data
    mock_bids.append(new_bid)
    
    # Update auction
    auction.current_bid = bid_request.bid_amount
    auction.bid_count += 1
    
    return auction

@app.get("/api/auctions/{auction_id}/bids", response_model=List[Bid])
async def get_auction_bids_endpoint(auction_id: str):
    """Get all bids for a specific auction"""
    if auction_id not in mock_auctions:
        raise HTTPException(status_code=404, detail="Auction not found")
    
    bids = get_auction_bids(auction_id)
    # Sort by timestamp descending (newest first)
    bids.sort(key=lambda x: x.timestamp, reverse=True)
    return bids

# Comment endpoints
@app.get("/api/auctions/{auction_id}/comments", response_model=List[Comment])
async def get_auction_comments_endpoint(auction_id: str):
    """Get all comments for a specific auction"""
    if auction_id not in mock_auctions:
        raise HTTPException(status_code=404, detail="Auction not found")
    
    comments = get_auction_comments(auction_id)
    # Sort by timestamp ascending (oldest first for natural conversation flow)
    comments.sort(key=lambda x: x.timestamp)
    return comments

@app.post("/api/auctions/{auction_id}/comments", response_model=List[Comment])
async def post_comment(auction_id: str, comment_request: CommentRequest):
    """Post a comment on an auction"""
    if auction_id not in mock_auctions:
        raise HTTPException(status_code=404, detail="Auction not found")
    
    # Create new comment
    new_comment = Comment(
        id=str(uuid.uuid4()),
        auction_id=auction_id,
        commenter_username=comment_request.commenter_username,
        content=comment_request.content,
        timestamp=datetime.now()
    )
    
    # Add comment to mock data
    mock_comments.append(new_comment)
    
    # Return updated comments list
    return get_auction_comments(auction_id)

# Statistics endpoints
@app.get("/api/stats")
async def get_platform_stats():
    """Get platform statistics"""
    total_users = len(mock_users)
    total_auctions = len(mock_auctions)
    active_auctions = len([a for a in mock_auctions.values() if a.status == AuctionStatus.ACTIVE])
    total_bids = len(mock_bids)
    total_value = sum(auction.current_bid for auction in mock_auctions.values())
    
    return {
        "total_users": total_users,
        "total_auctions": total_auctions,
        "active_auctions": active_auctions,
        "total_bids": total_bids,
        "total_auction_value": total_value,
        "average_auction_value": total_value / total_auctions if total_auctions > 0 else 0
    }

# Categories endpoint
@app.get("/api/categories")
async def get_categories():
    """Get all available auction categories"""
    categories = list(set(auction.category for auction in mock_auctions.values()))
    return {"categories": sorted(categories)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True) 