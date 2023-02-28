package com.novelis.formation.repository;

import com.novelis.formation.domain.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    Page<Article> findArticlesByContentContainingIgnoreCase(String content, Pageable pageable);
    Page<Article> findArticlesByAuthorIgnoreCase(String author, Pageable page);
    Page<Article> findArticlesByCreatedAtBetween(LocalDateTime start, LocalDateTime end, Pageable page);
}
