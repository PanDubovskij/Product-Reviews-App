package com.example.product_reviews_app.service;

import com.example.product_reviews_app.model.Root;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ReviewService {

    private static final String API_URL = "https://api.apigenius.io/reviews";
    private static final String API_KEY = "2489be3d7b6e4ccca7c0175efbeb4f99";


    public ResponseEntity<Root> getReviews(String query) {

        String url = API_URL + "?query={query}";
        RestTemplate template = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("apiGenius_API_Key", API_KEY);

        HttpEntity<String> request = new HttpEntity<>(headers);
        ResponseEntity<Root> response = template.exchange(url, HttpMethod.GET, request, Root.class, query);


//        HttpUrl.Builder urlBuilder = HttpUrl.parse(API_URL).newBuilder();
//        urlBuilder.addQueryParameter("query", query);
//
//        String url = urlBuilder.build().toString();
//        Request request = new Request.Builder().url(url).header("ApiGenius_API_Key", API_KEY).build();
//
//        try (Response response = client.newCall(request).execute()) {
//            if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);
//
//            String responseBody = response.body().string();
//            JsonNode jsonNode = mapper.readTree(responseBody);
//            JsonNode resultsNode = jsonNode.get("results");
//
//            List<String> reviews = new ArrayList<>();
//            for (JsonNode resultNode : resultsNode) {
//                String photoUrl = resultNode.get("urls").get("regular").asText();
//                reviews.add(photoUrl);
//            }
//            return reviews;
//        }
        return response;

    }
}
