from typing import List, Optional
from pydantic import BaseModel, Field
from datetime import datetime
from enum import Enum


class AuctionStatus(str, Enum):
    ACTIVE = "active"
    ENDED = "ended"
    UPCOMING = "upcoming"


class User(BaseModel):
    id: str
    username: str
    avatar_url: str
    reputation_score: int = Field(ge=0, le=100)
    joined_date: datetime
    total_auctions: int = 0
    total_bids: int = 0


class Bid(BaseModel):
    id: str
    auction_id: str
    bidder_username: str
    bid_amount: float = Field(gt=0)
    timestamp: datetime


class Comment(BaseModel):
    id: str
    auction_id: str
    commenter_username: str
    content: str = Field(min_length=1, max_length=500)
    timestamp: datetime


class Auction(BaseModel):
    id: str
    title: str = Field(min_length=1, max_length=100)
    description: str = Field(min_length=1, max_length=1000)
    seller_username: str
    start_price: float = Field(gt=0)
    current_bid: float
    end_time: datetime
    status: AuctionStatus
    image_urls: List[str] = []
    category: str
    created_at: datetime
    bid_count: int = 0
    watchers: int = 0


# Request models
class BidRequest(BaseModel):
    bid_amount: float = Field(gt=0)
    bidder_username: str


class CommentRequest(BaseModel):
    content: str = Field(min_length=1, max_length=500)
    commenter_username: str


class AuctionCreate(BaseModel):
    title: str = Field(min_length=1, max_length=100)
    description: str = Field(min_length=1, max_length=1000)
    seller_username: str
    start_price: float = Field(gt=0)
    end_time: datetime
    category: str
    image_urls: List[str] = [] 