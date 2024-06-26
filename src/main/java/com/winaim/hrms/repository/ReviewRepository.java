package com.winaim.hrms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.winaim.hrms.model.PerformanceReview;

@Repository
public interface ReviewRepository extends JpaRepository<PerformanceReview, Long> {
    // Additional custom queries can be defined here
}
