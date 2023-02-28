package com.novelis.formation.resource;

import com.novelis.formation.service.CommentService;
import com.novelis.formation.service.dto.CommentDto;
import com.novelis.formation.service.exception.BadRequestException;
import com.novelis.formation.service.exception.DataNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("comments")
public class CommentResource {

    @Autowired
    private CommentService commentService;

    @GetMapping
    public ResponseEntity<List<CommentDto>> getAll() {
        return ResponseEntity.ok(commentService.findAllComments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommentDto> get(@PathVariable Long id) throws DataNotFoundException {
        return ResponseEntity.ok(commentService.findCommentById(id));
    }

    @PostMapping
    public ResponseEntity<CommentDto> save(@RequestBody CommentDto commentDto) throws DataNotFoundException {
        return ResponseEntity.ok(commentService.saveComment(commentDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CommentDto> update(
            @PathVariable Long id,
            @RequestBody CommentDto commentDto
    ) throws BadRequestException {
        if (id == null) {
            throw new BadRequestException("id cannot be null");
        }
        return ResponseEntity.ok(commentService.updateComment(id, commentDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) throws DataNotFoundException, BadRequestException {
        if (id == null) {
            throw new BadRequestException("id cannot be null");
        }
        return ResponseEntity.ok(commentService.deleteComment(id));
    }

}
