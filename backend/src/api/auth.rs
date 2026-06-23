use axum::{response::IntoResponse, Json};
use serde::{Deserialize, Serialize};

#[derive(Serialize)]
pub struct ChallengeResponse {
    pub challenge: String,
}

#[derive(Deserialize)]
pub struct VerifyRequest {
    pub address: String,
    pub signature: String,
    pub challenge: String,
}

#[derive(Serialize)]
pub struct AuthResponse {
    pub token: String,
    pub username: Option<String>,
}

pub async fn get_challenge() -> impl IntoResponse {
    // TODO: Implement BE-003 (Challenge-response signature generation)
    Json(ChallengeResponse {
        challenge: "stellar-auth-challenge-mock-uuid".to_string(),
    })
}

pub async fn verify_signature(Json(_payload): Json<VerifyRequest>) -> impl IntoResponse {
    // TODO: Implement BE-003 (Stellar wallet-based signature verification)
    Json(AuthResponse {
        token: "mock-jwt-token-string".to_string(),
        username: Some("ebube.zaps".to_string()),
    })
}
