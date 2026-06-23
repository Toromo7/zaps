use axum::{response::IntoResponse, Json};
use serde::Deserialize;

#[derive(Deserialize)]
pub struct LikeRequest {
    pub payment_id: String,
}

#[derive(Deserialize)]
pub struct CommentRequest {
    pub payment_id: String,
    pub content: String,
}

pub async fn like_payment(Json(_payload): Json<LikeRequest>) -> impl IntoResponse {
    // TODO: Implement BE-009 (Like payment action)
    Json(serde_json::json!({ "success": true }))
}

pub async fn unlike_payment(Json(_payload): Json<LikeRequest>) -> impl IntoResponse {
    // TODO: Implement BE-009 (Unlike payment action)
    Json(serde_json::json!({ "success": true }))
}

pub async fn add_comment(Json(_payload): Json<CommentRequest>) -> impl IntoResponse {
    // TODO: Implement BE-010 (Comment creation endpoint)
    Json(serde_json::json!({
        "id": "comment_uuid",
        "username": "ebube.zaps",
        "content": _payload.content,
        "created_at": "2026-06-23T12:05:00Z"
    }))
}

pub async fn delete_comment(
    axum::extract::Path(_comment_id): axum::extract::Path<String>,
) -> impl IntoResponse {
    // TODO: Implement BE-010 (Comment deletion endpoint)
    Json(serde_json::json!({ "success": true }))
}
