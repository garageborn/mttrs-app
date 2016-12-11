desc 'Run pronto'
task :pronto do
  if ENV['CI_PULL_REQUEST']
    pull_request_id = `echo $CI_PULL_REQUEST | grep -o -E '[0–9]+$' | head -1 | sed -e 's/^0\+//'`
    system("PULL_REQUEST_ID=#{ pull_request_id } bundle exec pronto run -f github_pr")
  else
    system('bundle exec pronto run -f github')
  end
end
