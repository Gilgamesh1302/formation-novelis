package com.novelis.formation.service.mapper;

import com.novelis.formation.domain.Comment;
import com.novelis.formation.service.dto.ArticleDto;
import com.novelis.formation.service.dto.CommentDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(
        componentModel = "spring",
        uses = {
                UserMapper.class,
                ArticleMapper.class
        }
)
public interface CommentMapper extends AbstractMapper<Comment, CommentDto> {
        @Override
        @Mapping(target = "article", source = "article", ignore = true)
        CommentDto toDto(Comment entity);
}
