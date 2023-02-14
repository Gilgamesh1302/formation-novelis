package com.novelis.formation.service.mapper;

import com.novelis.formation.service.dto.ArticleDto;
import com.novelis.formation.domain.Article;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface ArticleMapper extends AbstractMapper<Article, ArticleDto> {
        @Override
        @Mapping(target = "comments", ignore = true)
        Article toEntity(ArticleDto entityDto);

        @Override
        @Mapping(target = "comments", ignore = true)
        ArticleDto toDto(Article entity);

}
