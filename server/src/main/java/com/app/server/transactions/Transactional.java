package com.app.server.transactions;

@FunctionalInterface
public interface Transactionable<T> {
    T method();
}
