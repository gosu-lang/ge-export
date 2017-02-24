package com.guidewire

/**
 * Factory class for Event-based build criteria filtering
 */
abstract class DateBasedFilter {

  function all() : BuildFilterExecutor {
    return new BuildFilterExecutor()
  }

  abstract function since() : BuildFilterExecutor
  abstract function between() : BuildFilterExecutor

}