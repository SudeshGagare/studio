package com.example.demo.service;

import com.google.cloud.ai.generativelanguage.v1.Content;
import com.google.cloud.ai.generativelanguage.v1.GenerateContentRequest;
import com.google.cloud.ai.generativelanguage.v1.GenerateContentResponse;
import com.google.cloud.ai.generativelanguage.v1.GenerationConfig;
import com.google.cloud.ai.generativelanguage.v1.ModelName;
import com.google.cloud.ai.generativelanguage.v1.Prompt;
import com.google.cloud.ai.generativelanguage.v1.TextPrompt;
import com.google.ai.generativelanguage.v1beta3.DiscussServiceGrpc;
import com.google.ai.generativelanguage.v1beta3.DiscussServiceGrpc.DiscussServiceBlockingStub;
import com.google.ai.generativelanguage.v1beta3.GenerateMessageRequest;
import com.google.ai.generativelanguage.v1beta3.GenerateMessageResponse;
import com.google.ai.generativelanguage.v1beta3.Message;
import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.ai.generativelanguage.v1.DiscussServiceClient;
import com.google.cloud.ai.generativelanguage.v1.DiscussServiceSettings;
import com.google.cloud.ai.generativelanguage.v1.DiscussServiceSettings.Builder;
import com.google.api.gax.rpc.FixedHeaderProvider;
import com.google.cloud.ai.generativelanguage.v1.DiscussServiceSettings;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class AIService {

    @Value("${GOOGLE_GENAI_API_KEY}")
    private String apiKey;
    public String generateBookSummary(String title, String author) throws IOException {

      
        String model = "models/gemini-pro";

        String prompt = "You are a book summarization expert. Please provide a concise summary of the book based on the title and author provided.\n\n" +
                "Title: " + title + "\n" +
                "Author: " + author + "\n\n" +
                "Summary: ";

        try (DiscussServiceClient discussServiceClient = DiscussServiceClient.create()) {

          GenerateContentRequest request =
            GenerateContentRequest.newBuilder()
                .setModel(model)
                .addContents(
                    Content.newBuilder()
                        .addParts(com.google.cloud.ai.generativelanguage.v1.Part.newBuilder().setText(prompt))
                        .build())
                .setGenerationConfig(
                    GenerationConfig.newBuilder().setMaxOutputTokens(256).build())
                .build();

          GenerateContentResponse response = discussServiceClient.generateContent(request);

          return response.getCandidates(0).getContent().getParts(0).getText();
        }
        
    }
}