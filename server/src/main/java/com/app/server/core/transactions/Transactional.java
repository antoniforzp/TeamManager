package com.app.server.core.transactions;

@FunctionalInterface
public interface Transactional<T> {
    T method();
}
