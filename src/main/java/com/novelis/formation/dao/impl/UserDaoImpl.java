package com.novelis.formation.dao.impl;

import com.novelis.formation.dao.UserDao;
import com.novelis.formation.domain.User;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {

    @Override
    public List<User> findAll() {
        return sessionFactory
                .openSession()
                .createQuery("from User", User.class)
                .getResultList();
    }

    @Override
    public User findById(Long id) {
        return sessionFactory
                .openSession()
                .find(User.class, id);
    }

    @Override
    public void save(User entityToSave) {
        Session session = sessionFactory.getCurrentSession();
        Transaction transaction = session.beginTransaction();
        session.persist(entityToSave);
        try {
            transaction.commit();
        } catch (Exception e) {
            transaction.rollback();
        } finally {
            session.close();
        }
    }

    @Override
    public void update(User updatedEntity) {
        Session session = sessionFactory.getCurrentSession();
        Transaction transaction = session.beginTransaction();
        session.merge(updatedEntity);
        try {
            transaction.commit();
        } catch (Exception e) {
            transaction.rollback();
        } finally {
            session.close();
        }
    }

    @Override
    public void delete(Long entityId) {
        Session session = sessionFactory.getCurrentSession();
        Transaction transaction = session.beginTransaction();
        User user = findById(entityId);
        session.remove(user);
        try {
            transaction.commit();
        } catch (Exception e) {
            transaction.rollback();
        } finally {
            session.close();
        }
    }

    @Override
    public User findByUsernameAndPassword(String username, String password) {
        return sessionFactory
                .openSession()
                .createQuery("from User r where r.username = :username and r.password = :password", User.class)
                .setParameter("username", username)
                .setParameter("password", password)
                .getSingleResult();
    }
}
