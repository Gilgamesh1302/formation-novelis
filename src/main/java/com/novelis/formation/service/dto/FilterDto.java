package com.novelis.formation.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FilterDto {
    private String sortBy;
    private boolean desc;
    private String filterBy;
    private String authorName;
    private LocalDateTime beginDate;
    private LocalDateTime endDate;
}
