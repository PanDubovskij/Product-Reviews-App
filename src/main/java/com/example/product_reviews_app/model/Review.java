package com.example.product_reviews_app.model;

import lombok.Data;

@Data
public class Review {
    public String review_title;
    public String link;
    public String review_description;
    public String review_publish_date;
}

