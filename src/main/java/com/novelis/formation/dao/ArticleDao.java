package com.novelis.formation.dao;

import com.novelis.formation.domain.Article;

import java.util.List;

public interface ArticleDao extends AbstractDao<Article, Long> {
    List<Article> searchArticleByKeywords(String keyword);
}
