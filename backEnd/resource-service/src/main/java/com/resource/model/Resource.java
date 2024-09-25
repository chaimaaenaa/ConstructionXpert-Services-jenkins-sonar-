package com.resource.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private int quantity;

    @Enumerated(EnumType.STRING)
    private ResourceType type;

    private String provider;

    private Long taskId;

    public enum ResourceType {
        MATERIAL,
        SERVICE,
        TOOL
    }
}
