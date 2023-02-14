package com.novelis.formation.service;

import com.novelis.formation.service.dto.CommentDto;
import com.novelis.formation.service.exception.DataNotFoundException;

import java.util.List;

public interface CommentService {
    List<CommentDto> findAllComments();
    CommentDto findCommentById(Long id) throws DataNotFoundException;
    CommentDto saveComment(CommentDto commentDto) throws DataNotFoundException;
    CommentDto updateComment(Long id, CommentDto updatedComment);
    String deleteComment(Long id) throws DataNotFoundException;
    List<CommentDto> findCommentsByArticleId(long articleId);
}
