package com.novelis.formation.dao.impl;

import com.novelis.formation.dao.ArticleDao;
import com.novelis.formation.domain.Article;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public class ArticleDaoImpl implements ArticleDao {

    @Override
    public void save(Article entityToSave) {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        entityToSave.setCreatedAt(LocalDateTime.now());
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
    public void update(Article updatedEntity) {
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
        Article articleToDelete = session.find(Article.class, entityId);
        session.remove(articleToDelete);
        try {
            transaction.commit();
        } catch (Exception e) {
            transaction.rollback();
        } finally {
            session.close();
        }
    }

    @Override
    public Article findById(Long entityId) {
        return sessionFactory
                .openSession()
                .find(Article.class, entityId);
    }

    @Override
    public List<Article> findAll() {
        return sessionFactory
                .openSession()
                .createQuery("from Article", Article.class)
                .getResultList();
    }

    @Override
    public List<Article> searchArticleByKeywords(String keyword) {
        return sessionFactory
                .openSession()
                .createQuery("from Article a where a.content like %:keyword%", Article.class)
                .setParameter("keyword", keyword)
                .getResultList();
    }
}
