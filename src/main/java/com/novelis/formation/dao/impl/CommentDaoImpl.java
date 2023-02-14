package com.novelis.formation.dao.impl;

import com.novelis.formation.dao.CommentDao;
import com.novelis.formation.domain.Comment;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public class CommentDaoImpl implements CommentDao {

    @Override
    public void save(Comment entityToSave) {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        entityToSave.setPublishingDate(LocalDateTime.now());
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
    public void update(Comment updatedEntity) {
        Session session = sessionFactory.openSession();
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
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        Comment commentToDelete = findById(entityId);
        session.remove(commentToDelete);
        try {
            transaction.commit();
        } catch (Exception e) {
            transaction.rollback();
        } finally {
            session.close();
        }
    }

    @Override
    public Comment findById(Long entityId) {
        return sessionFactory
                .openSession()
                .find(Comment.class, entityId);
    }

    @Override
    public List<Comment> findAll() {
        return sessionFactory
                .openSession()
                .createQuery("from Comment ", Comment.class)
                .getResultList();
    }
}
