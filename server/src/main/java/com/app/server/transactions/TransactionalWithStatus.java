package com.app.server.transactions;

import org.springframework.transaction.TransactionStatus;

@FunctionalInterface
public interface TransactionalWithStatus<T> {
    T method(TransactionStatus status);
}