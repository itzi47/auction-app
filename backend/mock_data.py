from datetime import datetime, timedelta
from models import User, Auction, Bid, Comment, AuctionStatus
import uuid

# Mock Users
mock_users = {
    "alex_collector": User(
        id=str(uuid.uuid4()),
        username="alex_collector",
        avatar_url="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        reputation_score=95,
        joined_date=datetime.now() - timedelta(days=365),
        total_auctions=15,
        total_bids=47
    ),
    "vintage_hunter": User(
        id=str(uuid.uuid4()),
        username="vintage_hunter",
        avatar_url="https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face",
        reputation_score=88,
        joined_date=datetime.now() - timedelta(days=200),
        total_auctions=8,
        total_bids=32
    ),
    "tech_enthusiast": User(
        id=str(uuid.uuid4()),
        username="tech_enthusiast",
        avatar_url="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        reputation_score=92,
        joined_date=datetime.now() - timedelta(days=150),
        total_auctions=12,
        total_bids=28
    ),
    "art_lover": User(
        id=str(uuid.uuid4()),
        username="art_lover",
        avatar_url="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        reputation_score=96,
        joined_date=datetime.now() - timedelta(days=300),
        total_auctions=20,
        total_bids=15
    ),
    "gadget_guru": User(
        id=str(uuid.uuid4()),
        username="gadget_guru",
        avatar_url="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        reputation_score=89,
        joined_date=datetime.now() - timedelta(days=120),
        total_auctions=6,
        total_bids=41
    )
}

# Mock Auctions
mock_auctions = {
    "auction_1": Auction(
        id="auction_1",
        title="Vintage Rolex Submariner 1960s",
        description="A stunning vintage Rolex Submariner from the 1960s in excellent condition. This piece has been carefully maintained and comes with original documentation. The watch features the iconic black dial and bezel, automatic movement, and has been serviced recently.",
        seller_username="alex_collector",
        start_price=8500.00,
        current_bid=12750.00,
        end_time=datetime.now() + timedelta(hours=6, minutes=23),
        status=AuctionStatus.ACTIVE,
        image_urls=[
            "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&h=600&fit=crop"
        ],
        category="Watches & Jewelry",
        created_at=datetime.now() - timedelta(days=3),
        bid_count=8,
        watchers=24
    ),
    "auction_2": Auction(
        id="auction_2",
        title="MacBook Pro M3 Max 16-inch (2024)",
        description="Brand new MacBook Pro with M3 Max chip, 16-inch Liquid Retina XDR display, 36GB unified memory, and 1TB SSD storage. Space Black color. Still in original packaging with full warranty. Perfect for creative professionals and developers.",
        seller_username="tech_enthusiast",
        start_price=3200.00,
        current_bid=3850.00,
        end_time=datetime.now() + timedelta(days=1, hours=12, minutes=45),
        status=AuctionStatus.ACTIVE,
        image_urls=[
            "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop"
        ],
        category="Electronics",
        created_at=datetime.now() - timedelta(days=1),
        bid_count=5,
        watchers=18
    ),
    "auction_3": Auction(
        id="auction_3",
        title="Original Picasso Lithograph 'The Dove'",
        description="Authentic Pablo Picasso lithograph 'The Dove' from 1961. Limited edition print in excellent condition, professionally framed. Comes with certificate of authenticity. A masterpiece from one of the greatest artists of the 20th century.",
        seller_username="art_lover",
        start_price=15000.00,
        current_bid=23500.00,
        end_time=datetime.now() + timedelta(days=2, hours=8, minutes=15),
        status=AuctionStatus.ACTIVE,
        image_urls=[
            "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop"
        ],
        category="Art & Collectibles",
        created_at=datetime.now() - timedelta(days=2),
        bid_count=12,
        watchers=35
    ),
    "auction_4": Auction(
        id="auction_4",
        title="Gaming Setup: RTX 4090 + i9-13900K",
        description="Ultimate gaming setup featuring NVIDIA RTX 4090, Intel i9-13900K, 64GB DDR5 RAM, 2TB NVMe SSD, custom water cooling. Built in premium Lian Li case with RGB lighting. Perfect for 4K gaming and content creation.",
        seller_username="gadget_guru",
        start_price=4500.00,
        current_bid=5200.00,
        end_time=datetime.now() + timedelta(hours=18, minutes=30),
        status=AuctionStatus.ACTIVE,
        image_urls=[
            "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&h=600&fit=crop"
        ],
        category="Electronics",
        created_at=datetime.now() - timedelta(hours=12),
        bid_count=6,
        watchers=22
    ),
    "auction_5": Auction(
        id="auction_5",
        title="1967 Gibson Les Paul Standard",
        description="Legendary 1967 Gibson Les Paul Standard in Cherry Sunburst finish. Original PAF humbuckers, incredible sustain and tone. This guitar has been owned by a professional musician and maintained in excellent condition. Includes original case.",
        seller_username="vintage_hunter",
        start_price=12000.00,
        current_bid=18750.00,
        end_time=datetime.now() + timedelta(days=3, hours=2, minutes=10),
        status=AuctionStatus.ACTIVE,
        image_urls=[
            "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop"
        ],
        category="Musical Instruments",
        created_at=datetime.now() - timedelta(days=1, hours=6),
        bid_count=9,
        watchers=31
    ),
    "auction_6": Auction(
        id="auction_6",
        title="Rare 1st Edition Pokémon Base Set Charizard",
        description="PSA 9 graded 1st Edition Base Set Charizard from 1998. This is one of the most iconic and valuable Pokémon cards ever made. The card is in near mint condition and has been professionally graded and authenticated by PSA.",
        seller_username="alex_collector",
        start_price=25000.00,
        current_bid=35200.00,
        end_time=datetime.now() + timedelta(days=4, hours=15, minutes=45),
        status=AuctionStatus.ACTIVE,
        image_urls=[
            "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1611751196844-c3b50e2dd03a?w=800&h=600&fit=crop"
        ],
        category="Trading Cards",
        created_at=datetime.now() - timedelta(hours=18),
        bid_count=15,
        watchers=48
    )
}

# Mock Bids
mock_bids = [
    Bid(
        id=str(uuid.uuid4()),
        auction_id="auction_1",
        bidder_username="vintage_hunter",
        bid_amount=12750.00,
        timestamp=datetime.now() - timedelta(minutes=15)
    ),
    Bid(
        id=str(uuid.uuid4()),
        auction_id="auction_1",
        bidder_username="gadget_guru",
        bid_amount=12000.00,
        timestamp=datetime.now() - timedelta(hours=2)
    ),
    Bid(
        id=str(uuid.uuid4()),
        auction_id="auction_2",
        bidder_username="tech_enthusiast",
        bid_amount=3850.00,
        timestamp=datetime.now() - timedelta(minutes=45)
    ),
    Bid(
        id=str(uuid.uuid4()),
        auction_id="auction_3",
        bidder_username="alex_collector",
        bid_amount=23500.00,
        timestamp=datetime.now() - timedelta(hours=1)
    ),
    Bid(
        id=str(uuid.uuid4()),
        auction_id="auction_6",
        bidder_username="vintage_hunter",
        bid_amount=35200.00,
        timestamp=datetime.now() - timedelta(minutes=30)
    )
]

# Mock Comments
mock_comments = [
    Comment(
        id=str(uuid.uuid4()),
        auction_id="auction_1",
        commenter_username="vintage_hunter",
        content="This is an absolutely stunning piece! The condition looks incredible for a 1960s Submariner. Do you have the service history documentation?",
        timestamp=datetime.now() - timedelta(hours=4)
    ),
    Comment(
        id=str(uuid.uuid4()),
        auction_id="auction_1",
        commenter_username="alex_collector",
        content="@vintage_hunter Yes, I have all the service records. The watch was last serviced 6 months ago by an authorized Rolex dealer.",
        timestamp=datetime.now() - timedelta(hours=3, minutes=45)
    ),
    Comment(
        id=str(uuid.uuid4()),
        auction_id="auction_2",
        commenter_username="gadget_guru",
        content="Is this the model with the Space Black finish? The photos look amazing! Still has the plastic wrap on it?",
        timestamp=datetime.now() - timedelta(hours=8)
    ),
    Comment(
        id=str(uuid.uuid4()),
        auction_id="auction_3",
        commenter_username="art_lover",
        content="Magnificent piece! Picasso's dove series is truly iconic. The framing looks professional - is that included in the sale?",
        timestamp=datetime.now() - timedelta(hours=12)
    ),
    Comment(
        id=str(uuid.uuid4()),
        auction_id="auction_6",
        commenter_username="tech_enthusiast",
        content="PSA 9 Charizard! 🔥 This takes me back to childhood. The grading looks legitimate. Good luck to all bidders!",
        timestamp=datetime.now() - timedelta(hours=6)
    )
] 