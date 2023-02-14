package com.novelis.formation.handler;

import com.novelis.formation.service.exception.DataAlreadyExistsException;
import com.novelis.formation.service.exception.DataNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class DataManipulationHandler {

    @ExceptionHandler(DataNotFoundException.class)
    public ResponseEntity<Error> dataNotFoundHandler(DataNotFoundException ex) {
        Error error = new Error(HttpStatus.NOT_FOUND, ex.getMessage());
        return new ResponseEntity<>(error, error.getStatus());
    }

    @ExceptionHandler(DataAlreadyExistsException.class)
    public ResponseEntity<?> dataAlreadyExistsHandler(DataAlreadyExistsException ex) {
        Error error = new Error(HttpStatus.FOUND, ex.getMessage());
        return new ResponseEntity<>(error, error.getStatus());
    }

}
