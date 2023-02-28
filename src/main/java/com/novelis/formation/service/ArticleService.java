package com.novelis.formation.service;

import com.novelis.formation.service.dto.ArticleDto;
import com.novelis.formation.service.dto.FilterDto;
import com.novelis.formation.service.exception.DataNotFoundException;
import org.springframework.data.domain.Page;

public interface ArticleService {
    ArticleDto saveArticle(ArticleDto articleDto);
    ArticleDto updateArticle(Long id, ArticleDto updatedArticle) throws DataNotFoundException;
    String deleteArticle(Long id) throws DataNotFoundException;
    Page<ArticleDto> findAllArticleByPage(int pageNumber, int pageSize);
    ArticleDto findArticleById(Long id) throws DataNotFoundException;
    Page<ArticleDto> searchArticleByKeyword(int page, int size, String keyword);
    Page<ArticleDto> filterArticle(FilterDto filterDto);
    ArticleDto getArticleWithComments(Long id) throws DataNotFoundException;
}
