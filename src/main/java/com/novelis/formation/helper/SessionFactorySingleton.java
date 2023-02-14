package com.novelis.formation.helper;

import org.hibernate.SessionFactory;
import org.hibernate.boot.Metadata;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;

public class SessionFactorySingleton {
    private static SessionFactory sessionFactory;

    private SessionFactorySingleton() {}

    public static SessionFactory getInstance() {
        if (sessionFactory == null) {
            StandardServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder()
                    .configure("hibernate.cfg.xml")
                    .build();
            Metadata metadata = new MetadataSources(serviceRegistry)
                    .getMetadataBuilder()
                    .build();
            sessionFactory = metadata
                    .getSessionFactoryBuilder()
                    .build();
        }
        return sessionFactory;
    }
}
