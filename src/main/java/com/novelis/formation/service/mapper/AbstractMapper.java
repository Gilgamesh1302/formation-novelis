package com.novelis.formation.service.mapper;

import org.mapstruct.Mapping;

import java.util.List;

public interface AbstractMapper<E, D> {
    E toEntity(D entityDto);
    D toDto(E entity);
    List<E> toEntityList(List<D> dtoList);
    List<D> toDtoList(List<E> entityList);
}
