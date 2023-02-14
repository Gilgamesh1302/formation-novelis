package com.novelis.formation.dao;

import com.novelis.formation.helper.SessionFactorySingleton;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.List;

public interface AbstractDao<T, D> {
    SessionFactory sessionFactory = SessionFactorySingleton.getInstance();
    public void save(T entityToSave);
    void update(T updatedEntity);
    void delete(D entityId);
    T findById(D entityId);
    List<T> findAll();
}
