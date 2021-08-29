package com.app.server.core.transactions;

import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

@Service
public class TransactionService {

    private final PlatformTransactionManager transactionManager;

    public TransactionService(PlatformTransactionManager transactionManager) {
        this.transactionManager = transactionManager;
    }

    public <T> T execute(Transactional<T> action) {

        TransactionTemplate transactionTemplate = new TransactionTemplate(transactionManager);
        return transactionTemplate.execute(status -> {
            try {
                return action.method();
            } catch (Exception exception) {
                status.setRollbackOnly();
                throw exception;
            }
        });
    }

    public <T> T executeWithStatus(TransactionalWithStatus<T> action) {

        TransactionTemplate transactionTemplate = new TransactionTemplate(transactionManager);
        return transactionTemplate.execute(status -> {
            try {
                return action.method(status);
            } catch (Exception exception) {
                status.setRollbackOnly();
                throw exception;
            }
        });
    }
}
