package com.app.server.transactions;

@FunctionalInterface
public interface Transactional<T> {
    T method();
}
