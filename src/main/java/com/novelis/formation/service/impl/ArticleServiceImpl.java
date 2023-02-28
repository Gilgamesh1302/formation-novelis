package com.novelis.formation.service.impl;

import com.novelis.formation.domain.Article;
import com.novelis.formation.repository.ArticleRepository;
import com.novelis.formation.repository.CommentRepository;
import com.novelis.formation.service.ArticleService;
import com.novelis.formation.service.dto.ArticleDto;
import com.novelis.formation.service.dto.CommentDto;
import com.novelis.formation.service.dto.FilterDto;
import com.novelis.formation.service.exception.DataNotFoundException;
import com.novelis.formation.service.mapper.ArticleMapper;
import com.novelis.formation.service.mapper.CommentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ArticleServiceImpl implements ArticleService {

    @Autowired
    private ArticleRepository articleRepository;
    @Autowired
    private ArticleMapper articleMapper;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private CommentMapper commentMapper;


    @Override
    public ArticleDto saveArticle(ArticleDto articleDto) {
        Article article = articleMapper.toEntity(articleDto);
        article.setCreatedAt(LocalDateTime.now());
        return articleMapper
                .toDto(articleRepository.save(article));
    }

    @Override
    public ArticleDto updateArticle(Long id, ArticleDto updatedArticle) throws DataNotFoundException {
        if (!articleRepository.existsById(id)) {
            throw new DataNotFoundException("No Article With Id " + id);
        }
        Article article = articleMapper.toEntity(updatedArticle);
        article.setId(id);
        return articleMapper
                .toDto(articleRepository.save(article));
    }

    @Override
    public String deleteArticle(Long id) throws DataNotFoundException {
        Article article = articleRepository
                .findById(id)
                .orElseThrow(() -> new DataNotFoundException("No Article With Id " + id));
        articleRepository.delete(article);
        return "Article Deleted Successfully";
    }

    @Override
    public Page<ArticleDto> findAllArticleByPage(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        return articleRepository
                .findAll(pageable)
                .map(articleMapper::toDto);
    }

    @Override
    public ArticleDto findArticleById(Long id) throws DataNotFoundException {
        Article article = articleRepository
                .findById(id)
                .orElseThrow(() -> new DataNotFoundException("Article Does not exist"));
        return articleMapper.toDto(article);
    }

    @Override
    public Page<ArticleDto> searchArticleByKeyword(int page, int size, String keyword) {
        Pageable pageable = PageRequest.of(page, size);
        return articleRepository
                .findArticlesByContentContainingIgnoreCase(keyword, pageable)
                .map(articleMapper::toDto);
    }

    @Override
    public ArticleDto getArticleWithComments(Long id) throws DataNotFoundException {
        Sort sort = Sort.by("publishingDate").descending();
        ArticleDto articleDto = findArticleById(id);
        List<CommentDto> comments = commentRepository
                .findCommentsByArticleId(id, sort)
                .stream()
                .map(commentMapper::toDto)
                .toList();
        articleDto.setComments(comments);
        return articleDto;
    }

    @Override
    public Page<ArticleDto> filterArticle(FilterDto filterDto) {
        Pageable page = PageRequest.of(0, 10);
        if (filterDto.getSortBy() != null) {
            Sort sort = Sort.by(filterDto.getSortBy());
            if (filterDto.isDesc()) {
                sort = sort.descending();
            }
            page = PageRequest.of(0, 10, sort);
        }
        Page<Article> result = articleRepository.findAll(page);
        if (filterDto.getFilterBy() != null) {
            if ("author".equals(filterDto.getFilterBy())) {
                result = articleRepository
                        .findArticlesByAuthorIgnoreCase(filterDto.getAuthorName(), page);
            } else if ("createdAt".equals(filterDto.getFilterBy())) {
                result = articleRepository
                        .findArticlesByCreatedAtBetween(filterDto.getBeginDate(), filterDto.getEndDate(), page);
            }
        }
        return result.map(articleMapper::toDto);
    }
}
