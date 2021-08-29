package com.app.server.core.transactions;

import org.springframework.transaction.TransactionStatus;

@FunctionalInterface
public interface TransactionalWithStatus<T> {
    T method(TransactionStatus status);
}