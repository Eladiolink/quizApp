package com.quiz.quiz_app.Service;

import com.quiz.quiz_app.DTO.Activity.ActivityMapper;
import com.quiz.quiz_app.DTO.Activity.ActivityRequestDTO;
import com.quiz.quiz_app.DTO.Activity.ActivityResponseDTO;
import com.quiz.quiz_app.DTO.Activity.ActivityWithStatus;
import com.quiz.quiz_app.Entity.Activity;
import com.quiz.quiz_app.Entity.User;
import com.quiz.quiz_app.Repository.ActivityRepository;
import com.quiz.quiz_app.Repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ActivityService {

    private ActivityRepository activityRepository;
    private UserRepository userRepository;
    private ActivityMapper activityMapper;

    public List<ActivityResponseDTO> getAll() {
        return activityMapper.toListActivityResponseDTO(activityRepository.findAll());
    }

    public List<ActivityResponseDTO> getAllByCientId(Integer id) {
        return activityMapper.toListActivityResponseDTO(activityRepository.findAllActivitiesNotAnsweredByClient(id));
    }

    public ActivityResponseDTO getById(Integer id) {
        Optional<Activity> activity = activityRepository.findById(id);
        return activityMapper.toActivityResponseDto(activity.orElse(null));
    }

    public ActivityResponseDTO save(ActivityRequestDTO dto) {
        Activity activity = activityMapper.toActivity(dto);
        User user = userRepository.findById(dto.getCreatedById()).orElse(null);
        activity.setCreatedBy(user);
        return activityMapper.toActivityResponseDto(activityRepository.save(activity));
    }

    public void delete(Integer id) {
        activityRepository.deleteById(id);
    }

    public List<ActivityWithStatus> findAllByClientAnswered(Integer id){
         var res = activityRepository.findAllByClientAnswered(id);
         return res;
    }
}