package com.novelis.formation.resource;


import com.novelis.formation.service.ArticleService;
import com.novelis.formation.service.dto.ArticleDto;
import com.novelis.formation.service.dto.FilterDto;
import com.novelis.formation.service.exception.BadRequestException;
import com.novelis.formation.service.exception.DataNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/articles")
public class ArticleResource {

    @Autowired
    ArticleService articleService;

    @GetMapping("/{id}")
    public ResponseEntity<ArticleDto> get(@PathVariable Long id) throws DataNotFoundException, BadRequestException {
        if (id == null) {
            throw new BadRequestException("Id cannot be null");
        }
        return ResponseEntity.ok(articleService.findArticleById(id));
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<ArticleDto> getArticleWithComments(
            @PathVariable Long id
    ) throws BadRequestException, DataNotFoundException {
        if (id == null) {
            throw new BadRequestException("id cannot be null");
        }
        return ResponseEntity.ok(articleService.getArticleWithComments(id));
    }

    @GetMapping
    public ResponseEntity<Page<ArticleDto>> getAllByPage(
            @RequestParam Optional<String> keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        ResponseEntity<Page<ArticleDto>> responseEntity = keyword
                .map(s -> ResponseEntity
                        .ok(articleService.searchArticleByKeyword(page, size, s))
                )
                .orElseGet(() -> ResponseEntity
                        .ok(articleService.findAllArticleByPage(page, size))
                );
        return responseEntity;
    }

    @GetMapping("/filter")
    public ResponseEntity<Page<ArticleDto>> filterArticle(@RequestBody FilterDto filter) {
        return ResponseEntity.ok(articleService.filterArticle(filter));
    }

    @PostMapping
    public ResponseEntity<ArticleDto> save(@RequestBody ArticleDto articleDto) {
        return ResponseEntity.ok(articleService.saveArticle(articleDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ArticleDto> update(
            @PathVariable Long id,
            @RequestBody ArticleDto articleDto
    ) throws DataNotFoundException, BadRequestException {
        if (id == null) {
            throw new BadRequestException("Id cannot be null");
        }
        return ResponseEntity.ok(articleService.updateArticle(id, articleDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) throws BadRequestException, DataNotFoundException {
        if (id == null) {
            throw new BadRequestException("id cannot be null");
        }
        return ResponseEntity.ok(articleService.deleteArticle(id));
    }

}
