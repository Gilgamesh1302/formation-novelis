package com.novelis.formation.repository;

import com.novelis.formation.domain.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    Page<Article> findArticlesByContentContainingIgnoreCase(String content, Pageable pageable);
}
