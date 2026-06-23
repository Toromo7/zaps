use axum::{response::IntoResponse, Json};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct BridgeQuoteRequest {
    pub source_chain: String,
    pub source_token: String,
    pub amount: String,
    pub destination_chain: String,
    pub destination_token: String,
    pub destination_address: String,
}

#[derive(Serialize)]
pub struct BridgeQuoteResponse {
    pub fee: String,
    pub receive_amount: String,
    pub bridge_tx_data: String, // Payload details to construct user-side wallet signature
}

#[derive(Deserialize)]
pub struct SubmitBridgeTxRequest {
    pub source_tx_hash: String,
}

pub async fn get_quote(Json(_payload): Json<BridgeQuoteRequest>) -> impl IntoResponse {
    // TODO: Implement BE-016 (Fetch bridge fee quote & route from Allbridge API)
    Json(BridgeQuoteResponse {
        fee: "0.005".to_string(),
        receive_amount: "99.95".to_string(),
        bridge_tx_data: "0x_mock_bridge_call_payload".to_string(),
    })
}

pub async fn submit_bridge_tx(Json(_payload): Json<SubmitBridgeTxRequest>) -> impl IntoResponse {
    // TODO: Implement BE-017 (Submit bridged transaction state to DB)
    Json(serde_json::json!({ "status": "submitted" }))
}

pub async fn get_bridge_status(
    axum::extract::Path(_tx_id): axum::extract::Path<String>,
) -> impl IntoResponse {
    // TODO: Implement BE-017 (Poll Allbridge API status)
    Json(serde_json::json!({ "status": "completed", "confirmations": 12 }))
}
