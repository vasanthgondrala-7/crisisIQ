from datetime import timedelta

import pytest

from app.core.security import create_access_token, decode_access_token, hash_password, verify_password


def test_password_hash_round_trip():
    password_hash = hash_password("secure-password")

    assert password_hash != "secure-password"
    assert verify_password("secure-password", password_hash)
    assert not verify_password("wrong-password", password_hash)


def test_access_token_round_trip():
    token = create_access_token("user-id", {"role": "dispatcher"})

    payload = decode_access_token(token)

    assert payload["sub"] == "user-id"
    assert payload["role"] == "dispatcher"


def test_expired_access_token_is_rejected():
    token = create_access_token("user-id", expires_delta=timedelta(seconds=-1))

    with pytest.raises(ValueError, match="expired"):
        decode_access_token(token)
