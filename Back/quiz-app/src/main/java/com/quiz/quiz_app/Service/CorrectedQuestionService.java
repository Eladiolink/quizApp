package com.quiz.quiz_app.Service;

import com.quiz.quiz_app.DTO.CorrectedQuestion.CorrectedQuestionDTO;
import com.quiz.quiz_app.Repository.CorrectedQuestionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CorrectedQuestionService {
    private CorrectedQuestionRepository correctedQuestionRepository;

    public List<CorrectedQuestionDTO> getCorrectedQuestionByActivity(Integer activityId, Integer userId) {
        var res = correctedQuestionRepository.findByUserIdAndActivityId(activityId,userId);
        return res;
    }
}
