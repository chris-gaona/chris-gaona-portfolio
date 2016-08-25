'use strict';

function editProject (req, res, next) {
  // runValidators makes it so the updated values are validated again before saving
  req.project.update(req.body, { runValidators: true }, function (err, project) {
    if (err) {
      // check for validation errors
      if (err.name === 'ValidationError') {
        var errorArray = [];

        if (err.errors.name) {
          errorArray.push({ code: 400, message: err.errors.name.message });
        }

        if (err.errors.category) {
          errorArray.push({ code: 400, message: err.errors.category.message });
        }

        if (err.errors.image) {
          errorArray.push({ code: 400, message: err.errors.image.message });
        }

        if (err.errors.created_on) {
          errorArray.push({ code: 400, message: err.errors.created_on.message });
        }

        if (err.errors.github_link) {
          errorArray.push({ code: 400, message: err.errors.github_link.message });
        }

        var errorMessages = { message: 'Validation Failed', errors: { property: errorArray}};

        return res.status(400).json(errorMessages);
      } else {
        return next(err);
      }
    }

    // send project
    res.status(200).json({project: project, message: 'Project Updated'});
  });
}

module.exports = editProject;
