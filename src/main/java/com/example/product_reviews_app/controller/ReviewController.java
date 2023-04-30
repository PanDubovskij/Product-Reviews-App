package com.example.product_reviews_app.controller;

import com.example.product_reviews_app.model.Root;
import com.example.product_reviews_app.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ReviewController {

    ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService rs) {
        reviewService = rs;
    }

    @GetMapping("/reviews-start")
    public String showForm() {
        return "reviews";
    }

    @GetMapping("/reviews")
    public String getReviews(
            @RequestParam(value = "query", required = false) String query,
            Model model) {
        ResponseEntity<Root> response = reviewService.getReviews(query);
        model.addAttribute("reviews", response.getBody().reviews.toArray());
        return "reviews_success";
    }
}
