package com.quiz.quiz_app.Service;

import com.quiz.quiz_app.DTO.Activity.ActivityMapper;
import com.quiz.quiz_app.DTO.Activity.ActivityRequestDTO;
import com.quiz.quiz_app.DTO.Activity.ActivityResponseDTO;
import com.quiz.quiz_app.Entity.Activity;
import com.quiz.quiz_app.Repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository activityRepository;
    @Autowired
    private ActivityMapper activityMapper;

    public List<ActivityResponseDTO> getAll() {
        return activityMapper.toListActivityResponseDTO(activityRepository.findAll());
    }

    public ActivityResponseDTO getById(Integer id) {
        Optional<Activity> activity = activityRepository.findById(id);
        return activityMapper.toActivityResponseDto(activity.orElse(null));
    }

    public ActivityResponseDTO save(ActivityRequestDTO dto) {
        Activity activity = activityMapper.toActivity(dto);

        return activityMapper.toActivityResponseDto(activityRepository.save(activity));
    }

    public void delete(Integer id) {
        activityRepository.deleteById(id);
    }
}