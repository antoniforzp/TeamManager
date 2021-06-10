package com.app.server.transactions;

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
        return transactionTemplate.execute(transactionStatus -> {
            try {
                return action.method();
            } catch (Exception exception) {
                transactionStatus.setRollbackOnly();
                throw exception;
            }
        });
    }

}
