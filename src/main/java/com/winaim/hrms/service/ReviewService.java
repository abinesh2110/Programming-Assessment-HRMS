package com.winaim.hrms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.winaim.hrms.model.PerformanceReview;
import com.winaim.hrms.repository.ReviewRepository;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public PerformanceReview saveReview(PerformanceReview review) {
        return reviewRepository.save(review);
    }

    public Optional<PerformanceReview> getReviewById(Long id) {
        return reviewRepository.findById(id);
    }

    public List<PerformanceReview> getAllReviews() {
        return reviewRepository.findAll();
    }

    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }

    public PerformanceReview updateReview(PerformanceReview review) {
        return reviewRepository.save(review);
    }
}