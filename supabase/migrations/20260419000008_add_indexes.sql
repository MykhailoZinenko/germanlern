create index on words using gin(search_vector);
create index on words (user_id, next_review_date);
create index on words (user_id, date_added desc);
create index on words (user_id, verification_source);

create index on study_sessions (user_id, started_at desc);
create index on study_sessions (user_id, completed, started_at desc);
create index on study_results (session_id);
create index on study_results (word_id);

create index on documents (user_id, last_opened_at desc);
create index on reading_texts (user_id, last_opened_at desc);
create index on annotations (document_id, type);

create index on word_buffer (user_id, created_at);
create index on user_tags (user_id, name);
create index on word_user_tags (word_id);
create index on word_user_tags (tag_id);

create index on feature_events (user_id, event, created_at desc);
create index on reading_word_events (user_id, reading_text_id);
create index on document_word_events (user_id, document_id);
