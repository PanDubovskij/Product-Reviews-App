package com.example.product_reviews_app.model;

import lombok.Data;

import java.util.ArrayList;

@Data
public class Root{
    public boolean success;
    public int status;
    public String title;
    public String sku;
    public String brand;
    public ArrayList<Review> reviews;
}
