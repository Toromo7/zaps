#![no_std]
#![allow(dead_code, unused_variables, unused_imports, unexpected_cfgs)]
use soroban_sdk::{contract, contractimpl, Address, Env, String};

#[contract]
pub struct UserRegistryContract;

#[contractimpl]
impl UserRegistryContract {
    /// Register a username mapping to the sender's address
    pub fn register_user(env: Env, user: Address, username: String) {
        // TODO: Implement SC-001 (Register address to username mapping)
        // TODO: Implement SC-002 (Validate username rules: length 3-15, alphanumeric, lowercase)
        user.require_auth();
        panic!("unimplemented: register_user");
    }

    /// Retrieve the Address associated with a username
    pub fn get_address(env: Env, username: String) -> Address {
        panic!("unimplemented: get_address");
    }

    /// Retrieve the username associated with an Address
    pub fn get_username(env: Env, user: Address) -> String {
        panic!("unimplemented: get_username");
    }

    /// Update user profile metadata (e.g. avatar URI)
    pub fn update_profile(env: Env, user: Address, avatar_uri: String) {
        // TODO: Implement SC-003 (Update profile avatar URI)
        user.require_auth();
        panic!("unimplemented: update_profile");
    }
}
