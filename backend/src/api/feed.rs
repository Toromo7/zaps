use axum::{response::IntoResponse, Json};
use serde::Serialize;

#[derive(Serialize)]
pub struct FeedItem {
    pub id: String,
    pub tx_hash: String,
    pub sender_username: String,
    pub sender_avatar: Option<String>,
    pub receiver_username: String,
    pub receiver_avatar: Option<String>,
    pub amount: String,
    pub currency: String,
    pub memo: String,
    pub likes_count: usize,
    pub comments_count: usize,
    pub has_liked: bool,
    pub created_at: String,
}

pub async fn get_public_feed() -> impl IntoResponse {
    // TODO: Implement BE-006 (Paginated Public Feed Fetch)
    let mock_feed = vec![
        FeedItem {
            id: "1".to_string(),
            tx_hash: "tx_hash_1".to_string(),
            sender_username: "ebube.zaps".to_string(),
            sender_avatar: None,
            receiver_username: "tolu.zaps".to_string(),
            receiver_avatar: None,
            amount: "5000.00".to_string(),
            currency: "NGN".to_string(),
            memo: "Lunch 🍕".to_string(),
            likes_count: 3,
            comments_count: 1,
            has_liked: true,
            created_at: "2026-06-23T12:00:00Z".to_string(),
        },
        FeedItem {
            id: "2".to_string(),
            tx_hash: "tx_hash_2".to_string(),
            sender_username: "chidi.zaps".to_string(),
            sender_avatar: None,
            receiver_username: "amara.zaps".to_string(),
            receiver_avatar: None,
            amount: "12000.00".to_string(),
            currency: "NGN".to_string(),
            memo: "Concert ticket 🎟️".to_string(),
            likes_count: 5,
            comments_count: 2,
            has_liked: false,
            created_at: "2026-06-23T11:30:00Z".to_string(),
        },
    ];
    Json(mock_feed)
}

pub async fn get_friends_feed() -> impl IntoResponse {
    // TODO: Implement BE-007 (Paginated Friends Feed Fetch)
    let mock_feed: Vec<FeedItem> = vec![];
    Json(mock_feed)
}

pub async fn get_private_feed() -> impl IntoResponse {
    // TODO: Implement BE-008 (Personal/Private Feed Fetch)
    let mock_feed: Vec<FeedItem> = vec![];
    Json(mock_feed)
}
