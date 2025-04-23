package com.quiz.quiz_app.Service;

import com.quiz.quiz_app.DTO.ActivityQuestion.ActivityQuestionMapper;
import com.quiz.quiz_app.DTO.ActivityQuestion.ActivityQuestionResponseDTO;
import com.quiz.quiz_app.DTO.ActivityQuestion.ActivityQuestionResquestDTO;
import com.quiz.quiz_app.Entity.Activity;
import com.quiz.quiz_app.Entity.ActivityQuestion;
import com.quiz.quiz_app.Repository.ActivityQuestionRepository;
import com.quiz.quiz_app.Repository.ActivityRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ActivityQuestionService {

    private  ActivityQuestionRepository questionRepository;
    private  ActivityRepository activityRepository;
    private  ActivityQuestionMapper activityQuestionMapper;

    public ActivityQuestionResponseDTO create(ActivityQuestionResquestDTO dto) {
        Activity activity = activityRepository.findById(dto.getActivityId())
                .orElseThrow(() -> new EntityNotFoundException("Atividade não encontrada com ID: " + dto.getActivityId()));

        ActivityQuestion activityQuestion = activityQuestionMapper.toActivityQuestion(dto);
        activityQuestion.setActivity(activity);
        ActivityQuestion activityQuestionSaved = questionRepository.save(activityQuestion);
        return activityQuestionMapper.toActivityQuestionResponseDTO(activityQuestionSaved);

    }

    public List<ActivityQuestionResponseDTO> findAll() {
        return activityQuestionMapper.toListActivityQuestionResponseDTO(questionRepository.findAll());
    }

    public List<ActivityQuestionResponseDTO> findAllByActivityId(Integer activityId) {
        List<ActivityQuestion> activityQuestions = questionRepository.findByActivityId(activityId);
        return activityQuestionMapper.toListActivityQuestionResponseDTO(activityQuestions);
    }

    // READ BY ID
    public ActivityQuestion findById(Integer id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Questão não encontrada com ID: " + id));
    }

    public ActivityQuestion update(Integer id, ActivityQuestion updatedQuestion) {
        ActivityQuestion existing = findById(id);

        existing.setQuestion(updatedQuestion.getQuestion());
        existing.setOptionA(updatedQuestion.getOptionA());
        existing.setOptionB(updatedQuestion.getOptionB());
        existing.setOptionC(updatedQuestion.getOptionC());
        existing.setOptionD(updatedQuestion.getOptionD());
        existing.setOptionE(updatedQuestion.getOptionE());
        existing.setCorrectOption(updatedQuestion.getCorrectOption());
        existing.setImage(updatedQuestion.getImage());

        return questionRepository.save(existing);
    }

    public void delete(Integer id) {
        if (!questionRepository.existsById(id)) {
            throw new EntityNotFoundException("Questão não encontrada com ID: " + id);
        }
        questionRepository.deleteById(id);
    }
}
