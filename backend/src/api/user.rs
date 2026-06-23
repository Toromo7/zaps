use axum::{response::IntoResponse, Json};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct UpdateProfileRequest {
    pub display_name: Option<String>,
    pub avatar_url: Option<String>,
}

#[derive(Serialize)]
pub struct ProfileResponse {
    pub address: String,
    pub username: String,
    pub display_name: Option<String>,
    pub avatar_url: Option<String>,
}

#[derive(Deserialize)]
pub struct SearchQuery {
    pub q: String,
}

#[derive(Serialize)]
pub struct UserSearchItem {
    pub username: String,
    pub address: String,
    pub avatar_url: Option<String>,
}

#[derive(Deserialize)]
pub struct FriendRequest {
    pub friend_address: String,
}

pub async fn get_profile() -> impl IntoResponse {
    // TODO: Implement BE-004 (Get User Profile details)
    Json(ProfileResponse {
        address: "GABC1234EXAMPLESTELLARADDRESSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX".to_string(),
        username: "ebube.zaps".to_string(),
        display_name: Some("Ebube One".to_string()),
        avatar_url: None,
    })
}

pub async fn update_profile(Json(_payload): Json<UpdateProfileRequest>) -> impl IntoResponse {
    // TODO: Implement BE-004 (Update avatar, display name)
    Json(ProfileResponse {
        address: "GABC1234EXAMPLESTELLARADDRESSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX".to_string(),
        username: "ebube.zaps".to_string(),
        display_name: Some("Ebube Updated".to_string()),
        avatar_url: Some("https://example.com/avatar.png".to_string()),
    })
}

pub async fn search_users(
    axum::extract::Query(_params): axum::extract::Query<SearchQuery>,
) -> impl IntoResponse {
    // TODO: Implement BE-005 (Regex-based username search endpoint)
    let mock_results = vec![UserSearchItem {
        username: "tolu.zaps".to_string(),
        address: "GDEF5678EXAMPLESTELLARADDRESSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX".to_string(),
        avatar_url: None,
    }];
    Json(mock_results)
}

pub async fn list_friends() -> impl IntoResponse {
    // TODO: Implement BE-012 (Friend list retrieval endpoint)
    let mock_friends: Vec<UserSearchItem> = vec![];
    Json(mock_friends)
}

pub async fn send_friend_request(Json(_payload): Json<FriendRequest>) -> impl IntoResponse {
    // TODO: Implement BE-011 (Send friend request endpoint)
    Json(serde_json::json!({ "status": "pending" }))
}
