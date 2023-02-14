package com.novelis.formation.service.mapper;

import com.novelis.formation.domain.User;
import com.novelis.formation.service.dto.UserDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper extends AbstractMapper<User, UserDto> {

}
