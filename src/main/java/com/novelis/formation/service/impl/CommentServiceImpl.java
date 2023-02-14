package com.novelis.formation.service.impl;

import com.novelis.formation.domain.Comment;
import com.novelis.formation.repository.ArticleRepository;
import com.novelis.formation.repository.CommentRepository;
import com.novelis.formation.repository.UserRepository;
import com.novelis.formation.service.CommentService;
import com.novelis.formation.service.dto.CommentDto;
import com.novelis.formation.service.exception.DataNotFoundException;
import com.novelis.formation.service.mapper.CommentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ArticleRepository articleRepository;
    @Autowired
    private CommentMapper commentMapper;

    @Override
    public List<CommentDto> findAllComments() {
        return commentMapper
                .toDtoList(commentRepository.findAll());
    }

    @Override
    public CommentDto findCommentById(Long id) throws DataNotFoundException {
        Comment comment  = commentRepository
                .findById(id)
                .orElseThrow(() -> new DataNotFoundException("No Comment With id " + id));
        return commentMapper.toDto(comment);
    }

    @Override
    public CommentDto saveComment(CommentDto commentDto) throws DataNotFoundException {
        Comment commentToSave = commentMapper.toEntity(commentDto);
        commentToSave.setUser(
                userRepository
                        .findById(commentToSave.getUser().getId())
                        .orElseThrow(() -> new DataNotFoundException("no user found"))
        );
        commentToSave.setArticle(
                articleRepository
                        .findById(commentToSave.getArticle().getId())
                        .orElseThrow(() -> new DataNotFoundException("no article found"))
        );
        commentToSave.setPublishingDate(LocalDateTime.now());
        return commentMapper
                .toDto(commentRepository.save(commentToSave));
    }

    @Override
    public CommentDto updateComment(Long id, CommentDto updatedComment) {
        Comment commentToUpdate = commentMapper.toEntity(updatedComment);
        commentToUpdate.setId(id);
        return commentMapper
                .toDto(commentRepository.save(commentToUpdate));
    }

    @Override
    public String deleteComment(Long id) throws DataNotFoundException {
        Comment commentToDelete = commentRepository
                .findById(id)
                .orElseThrow(() -> new DataNotFoundException("No Comment With id " + id));
        commentRepository.delete(commentToDelete);
        return "Comment Deleted Successfully";
    }

    @Override
    public List<CommentDto> findCommentsByArticleId(long articleId) {
        List<Comment> articleComments = commentRepository.findCommentsByArticleId(articleId);
        return commentMapper.toDtoList(articleComments);
    }
}
