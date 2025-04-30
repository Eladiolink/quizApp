package com.quiz.quiz_app.Service;

import com.quiz.quiz_app.DTO.AnsweredQuestion.*;
import com.quiz.quiz_app.Entity.ActivityQuestion;
import com.quiz.quiz_app.Entity.AnsweredQuestion;
import com.quiz.quiz_app.Entity.User;
import com.quiz.quiz_app.Enum.UserType;
import com.quiz.quiz_app.Repository.ActivityQuestionRepository;
import com.quiz.quiz_app.Repository.AnsweredQuestionRepository;
import com.quiz.quiz_app.Repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AnsweredQuestionService {

    private  AnsweredQuestionRepository answeredQuestionRepository;
    private  UserRepository userRepository;
    private  ActivityQuestionRepository activityQuestionRepository;
    private  AnsweredQuestionMapper answeredQuestionMapper;

    // CREATE
    public AnsweredQuestionResponseDTO create(AnsweredQuestionRequestDTO dto) {
        User user = userRepository.findById(dto.getClientId()).get();;

        // Verifica se o usuário é do tipo CLIENTE
        if (user.getType() != UserType.CLIENTE) {
            throw new IllegalArgumentException("Only CLIENTE users can answer questions.");
        }

        ActivityQuestion question = activityQuestionRepository.findById(dto.getQuestionId())
                .orElseThrow(() -> new EntityNotFoundException("Question not found"));

        // Verifica se já existe uma resposta para este clientId e questionId
        boolean alreadyAnswered = answeredQuestionRepository.existsByClientIdAndQuestionId(dto.getClientId(), dto.getQuestionId());
        if (alreadyAnswered) {
            throw new IllegalStateException("This question has already been answered by this user.");
        }

        AnsweredQuestion answeredQuestion = new AnsweredQuestion();
        answeredQuestion.setClient(user);
        answeredQuestion.setQuestion(question);
        answeredQuestion.setSelectedOption(dto.getSelectedOption());
        answeredQuestion.setCreatedAt(LocalDateTime.now());

        AnsweredQuestion saved = answeredQuestionRepository.save(answeredQuestion);
        return answeredQuestionMapper.toAnsweredQuestionResponseDTO(saved);
    }


    // READ ALLy
    public List<AnsweredQuestionResponseDTO> findAll() {
        return answeredQuestionMapper.toListAnsweredQuestionResponseDTO(answeredQuestionRepository.findAll());
    }

    // READ BY ID
    public AnsweredQuestionResponseDTO findById(Integer id) {
        AnsweredQuestion answeredQuestion = answeredQuestionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Resposta não encontrada"));
        return answeredQuestionMapper.toAnsweredQuestionResponseDTO(answeredQuestion);
    }

    public List<AnsweredQuestionResponseDTO> findAllByActivityId(Integer activityId) {
        boolean exists = activityQuestionRepository.existsById(activityId);
        if (!exists) {
            throw new EntityNotFoundException("Activity not found");
        }

        List<AnsweredQuestion> answeredQuestions = answeredQuestionRepository.findAllByQuestion_Activity_Id(activityId);

        return answeredQuestions.stream()
                .map(answeredQuestionMapper::toAnsweredQuestionResponseDTO)
                .collect(Collectors.toList());
    }

    // DELETE
    public void delete(Integer id) {
        if (!answeredQuestionRepository.existsById(id)) {
            throw new EntityNotFoundException("Resposta não encontrada");
        }
        answeredQuestionRepository.deleteById(id);
    }

    public List<AnsweredQuestionSummaryDTO> activityClientAnswered(Integer id, Integer userId){
        List<AnsweredQuestionSummaryDTO> questionsDTO = new ArrayList<>();
        List<Object[]> questions = answeredQuestionRepository.findAllActivitiesNotAnsweredByClient(id,userId);

        for(Object[] question : questions){
            questionsDTO.add(new AnsweredQuestionSummaryDTO(question));
        }

        return questionsDTO;
    }
}
