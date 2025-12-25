// package com.example.crudapp.controller;

// import com.example.crudapp.model.Entry;
// import com.example.crudapp.service.EntryService;
// import com.fasterxml.jackson.databind.ObjectMapper;

// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;

// import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
// import org.springframework.boot.test.mock.mockito.MockBean;

// import org.springframework.http.MediaType;
// import org.springframework.test.web.servlet.MockMvc;

// import java.time.LocalDate;
// import java.util.Arrays;
// import java.util.List;

// import static org.mockito.ArgumentMatchers.*;
// import static org.mockito.Mockito.when;

// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

// @WebMvcTest(controllers = EntryController.class)
// class EntryControllerTest {

//     @Autowired
//     private MockMvc mockMvc;

//     @MockBean
//     private EntryService entryService;

//     @Autowired
//     private ObjectMapper objectMapper;


//     @Test
//     void testGetAllEntries() throws Exception {
//         Entry e1 = new Entry(100.0, "Food", LocalDate.parse("2025-10-12"));
//         e1.setId(1L);

//         Entry e2 = new Entry(200.0, "Travel", LocalDate.parse("2025-11-15"));
//         e2.setId(2L);

//         List<Entry> mockList = Arrays.asList(e1, e2);

//         when(entryService.getAllEntries()).thenReturn(mockList);

//         mockMvc.perform(get("/api/entries"))
//                 .andExpect(status().isOk())
//                 .andExpect(jsonPath("$.length()").value(2))
//                 .andExpect(jsonPath("$[0].description").value("Food"));
//     }


//     @Test
//     void testGetEntryByIdFound() throws Exception {
//         Entry entry = new Entry(300.0, "Test Entry", LocalDate.parse("2025-10-25"));
//         entry.setId(1L);

//         when(entryService.getEntryById(1L)).thenReturn(entry);

//         mockMvc.perform(get("/api/entries/1"))
//                 .andExpect(status().isOk())
//                 .andExpect(jsonPath("$.description").value("Test Entry"));
//     }


//     @Test
//     void testGetEntryByIdNotFound() throws Exception {
//         when(entryService.getEntryById(99L)).thenReturn(null);

//         mockMvc.perform(get("/api/entries/99"))
//                 .andExpect(status().isNotFound())
//                 // Body is JSON from controller, so OK to check:
//                 .andExpect(jsonPath("$.error").value("Entry not found"));
//     }


//     /* -------------------- CREATE ENTRY -------------------- */
//     @Test
//     void testCreateEntrySuccess() throws Exception {
//         Entry request = new Entry(500.0, "Shopping", LocalDate.parse("2025-12-01"));

//         Entry saved = new Entry(500.0, "Shopping", LocalDate.parse("2025-12-01"));
//         saved.setId(1L);

//         when(entryService.createEntry(any(Entry.class))).thenReturn(saved);

//         mockMvc.perform(post("/api/entries")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content(objectMapper.writeValueAsString(request)))
//                 .andExpect(status().isCreated())
//                 .andExpect(jsonPath("$.id").value(1L));
//     }


    
//     @Test
//     void testCreateEntryValidationFail() throws Exception {
//         Entry invalid = new Entry(null, "", null);

//         mockMvc.perform(post("/api/entries")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content(objectMapper.writeValueAsString(invalid)))
//                 .andExpect(status().isBadRequest())
//                 .andExpect(content().string(""));  // ✔ Expect empty body
//     }



//     @Test
//     void testUpdateEntrySuccess() throws Exception {
//         Entry request = new Entry(800.0, "Updated", LocalDate.parse("2025-12-20"));
//         Entry updated = new Entry(800.0, "Updated", LocalDate.parse("2025-12-20"));
//         updated.setId(1L);

//         when(entryService.updateEntry(eq(1L), any(Entry.class))).thenReturn(updated);

//         mockMvc.perform(put("/api/entries/1")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content(objectMapper.writeValueAsString(request)))
//                 .andExpect(status().isOk())
//                 .andExpect(jsonPath("$.amount").value(800.0));
//     }


//     @Test
//     void testUpdateEntryNotFound() throws Exception {
//         Entry request = new Entry(800.0, "Updated", LocalDate.parse("2025-12-20"));

//         when(entryService.updateEntry(eq(99L), any(Entry.class))).thenReturn(null);

//         mockMvc.perform(put("/api/entries/99")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content(objectMapper.writeValueAsString(request)))
//                 .andExpect(status().isNotFound())
//                 .andExpect(jsonPath("$.error").value("Entry not found"));
//     }


//     /* -------------------- DELETE ONE -------------------- */
//     @Test
//     void testDeleteEntrySuccess() throws Exception {
//         when(entryService.deleteEntry(1L)).thenReturn(true);

//         mockMvc.perform(delete("/api/entries/1"))
//                 .andExpect(status().isOk())
//                 .andExpect(jsonPath("$.message").value("Entry deleted successfully"));
//     }


//     @Test
//     void testDeleteEntryNotFound() throws Exception {
//         when(entryService.deleteEntry(99L)).thenReturn(false);

//         mockMvc.perform(delete("/api/entries/99"))
//                 .andExpect(status().isNotFound())
//                 .andExpect(jsonPath("$.error").value("Entry not found"));
//     }


//     /* -------------------- DELETE ALL -------------------- */
//     @Test
//     void testDeleteAllEntries() throws Exception {
//         mockMvc.perform(delete("/api/entries"))
//                 .andExpect(status().isOk())
//                 .andExpect(jsonPath("$.message").value("All entries deleted successfully"));
//     }
// }

// package com.example.crudapp.controller;

// import com.example.crudapp.model.Entry;
// import com.example.crudapp.service.EntryService;
// import com.fasterxml.jackson.databind.ObjectMapper;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
// import org.springframework.http.MediaType;
// import org.springframework.test.context.DynamicPropertyRegistry;
// import org.springframework.test.context.DynamicPropertySource;
// import org.springframework.test.web.servlet.MockMvc;

// import java.time.LocalDate;
// import java.util.Arrays;
// import java.util.List;

// import static org.mockito.ArgumentMatchers.any;
// import static org.mockito.ArgumentMatchers.eq;
// import static org.mockito.Mockito.when;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

// @WebMvcTest(controllers = EntryController.class)
// class EntryControllerTest {

//     @Autowired
//     private MockMvc mockMvc;

//     @MockBean
//     private EntryService entryService;

//     @Autowired
//     private ObjectMapper objectMapper;

//     // ========= FEATURE FLAGS =========
//     static boolean featureUpdateEnabled = true;
//     static boolean featureDeleteAllEnabled = true;

//     @DynamicPropertySource
//     static void overrideProps(DynamicPropertyRegistry registry) {
//         registry.add("FEATURE_UPDATE", () -> featureUpdateEnabled);
//         registry.add("FEATURE_DELETE_ALL", () -> featureDeleteAllEnabled);
//     }
//     // ================================

//     /* ---------- GET ALL ---------- */
//     @Test
//     void testGetAllEntries() throws Exception {
//         Entry e1 = new Entry(100.0, "Food", LocalDate.parse("2025-10-12"));
//         e1.setId(1L);
//         Entry e2 = new Entry(200.0, "Travel", LocalDate.parse("2025-11-15"));
//         e2.setId(2L);

//         when(entryService.getAllEntries()).thenReturn(Arrays.asList(e1, e2));

//         mockMvc.perform(get("/api/entries"))
//                 .andExpect(status().isOk())
//                 .andExpect(jsonPath("$.length()").value(2));
//     }

//     /* ---------- GET BY ID ---------- */
//     @Test
//     void testGetEntryByIdFound() throws Exception {
//         Entry entry = new Entry(300.0, "Test", LocalDate.parse("2025-10-25"));
//         entry.setId(1L);

//         when(entryService.getEntryById(1L)).thenReturn(entry);

//         mockMvc.perform(get("/api/entries/1"))
//                 .andExpect(status().isOk());
//     }

//     @Test
//     void testGetEntryByIdNotFound() throws Exception {
//         when(entryService.getEntryById(99L)).thenReturn(null);

//         mockMvc.perform(get("/api/entries/99"))
//                 .andExpect(status().isNotFound());
//     }

//     /* ---------- CREATE ---------- */
//     @Test
//     void testCreateEntrySuccess() throws Exception {
//         Entry request = new Entry(500.0, "Shopping", LocalDate.parse("2025-12-01"));
//         Entry saved = new Entry(500.0, "Shopping", LocalDate.parse("2025-12-01"));
//         saved.setId(1L);

//         when(entryService.createEntry(any())).thenReturn(saved);

//         mockMvc.perform(post("/api/entries")
//                         .contentType(MediaType.APPLICATION_JSON)
//                         .content(objectMapper.writeValueAsString(request)))
//                 .andExpect(status().isCreated());
//     }

//     @Test
//     void testCreateEntryValidationFail() throws Exception {
//         Entry invalid = new Entry(null, "", null);

//         mockMvc.perform(post("/api/entries")
//                         .contentType(MediaType.APPLICATION_JSON)
//                         .content(objectMapper.writeValueAsString(invalid)))
//                 .andExpect(status().isBadRequest());
//     }

//     /* ---------- UPDATE ---------- */
//     @Test
//     void testUpdateEntrySuccess() throws Exception {
//         featureUpdateEnabled = true;

//         Entry request = new Entry(800.0, "Updated", LocalDate.parse("2025-12-20"));
//         Entry updated = new Entry(800.0, "Updated", LocalDate.parse("2025-12-20"));
//         updated.setId(1L);

//         when(entryService.updateEntry(eq(1L), any())).thenReturn(updated);

//         mockMvc.perform(put("/api/entries/1")
//                         .contentType(MediaType.APPLICATION_JSON)
//                         .content(objectMapper.writeValueAsString(request)))
//                 .andExpect(status().isOk());
//     }

//     @Test
//     void testUpdateEntryNotFound() throws Exception {
//         featureUpdateEnabled = true;

//         Entry request = new Entry(800.0, "Updated", LocalDate.parse("2025-12-20"));

//         when(entryService.updateEntry(eq(99L), any())).thenReturn(null);

//         mockMvc.perform(put("/api/entries/99")
//                         .contentType(MediaType.APPLICATION_JSON)
//                         .content(objectMapper.writeValueAsString(request)))
//                 .andExpect(status().isNotFound());
//     }

//     @Test
//     void testUpdateEntryFeatureDisabled() throws Exception {
//         featureUpdateEnabled = false;

//         Entry request = new Entry(900.0, "Blocked", LocalDate.parse("2025-12-25"));

//         mockMvc.perform(put("/api/entries/1")
//                         .contentType(MediaType.APPLICATION_JSON)
//                         .content(objectMapper.writeValueAsString(request)))
//                 .andExpect(status().isNotImplemented());

//         featureUpdateEnabled = true;
//     }

//     /* ---------- DELETE ---------- */
//     @Test
//     void testDeleteEntrySuccess() throws Exception {
//         when(entryService.deleteEntry(1L)).thenReturn(true);

//         mockMvc.perform(delete("/api/entries/1"))
//                 .andExpect(status().isOk());
//     }

//     @Test
//     void testDeleteEntryNotFound() throws Exception {
//         when(entryService.deleteEntry(99L)).thenReturn(false);

//         mockMvc.perform(delete("/api/entries/99"))
//                 .andExpect(status().isNotFound());
//     }

//     @Test
//     void testDeleteAllEntriesSuccess() throws Exception {
//         featureDeleteAllEnabled = true;

//         mockMvc.perform(delete("/api/entries"))
//                 .andExpect(status().isOk());
//     }

//     @Test
//     void testDeleteAllEntriesFeatureDisabled() throws Exception {
//         featureDeleteAllEnabled = false;

//         mockMvc.perform(delete("/api/entries"))
//                 .andExpect(status().isNotImplemented());

//         featureDeleteAllEnabled = true;
//     }
// }
package com.example.crudapp.controller;

import com.example.crudapp.config.FeatureConfig;
import com.example.crudapp.model.Entry;
import com.example.crudapp.service.EntryService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.Arrays;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = EntryController.class)
class EntryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EntryService entryService;

    // ✅ THIS IS THE KEY FIX
    @MockBean
    private FeatureConfig featureConfig;

    @Autowired
    private ObjectMapper objectMapper;

    /* ---------- GET ALL ---------- */
    @Test
    void testGetAllEntries() throws Exception {
        Entry e1 = new Entry(100.0, "Food", LocalDate.parse("2025-10-12"));
        e1.setId(1L);
        Entry e2 = new Entry(200.0, "Travel", LocalDate.parse("2025-11-15"));
        e2.setId(2L);

        when(entryService.getAllEntries()).thenReturn(Arrays.asList(e1, e2));

        mockMvc.perform(get("/api/entries"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }

    /* ---------- GET BY ID ---------- */
    @Test
    void testGetEntryByIdFound() throws Exception {
        Entry entry = new Entry(300.0, "Test", LocalDate.parse("2025-10-25"));
        entry.setId(1L);

        when(entryService.getEntryById(1L)).thenReturn(entry);

        mockMvc.perform(get("/api/entries/1"))
                .andExpect(status().isOk());
    }

    @Test
    void testGetEntryByIdNotFound() throws Exception {
        when(entryService.getEntryById(99L)).thenReturn(null);

        mockMvc.perform(get("/api/entries/99"))
                .andExpect(status().isNotFound());
    }

    /* ---------- CREATE ---------- */
    @Test
    void testCreateEntrySuccess() throws Exception {
        Entry request = new Entry(500.0, "Shopping", LocalDate.parse("2025-12-01"));
        Entry saved = new Entry(500.0, "Shopping", LocalDate.parse("2025-12-01"));
        saved.setId(1L);

        when(entryService.createEntry(any())).thenReturn(saved);

        mockMvc.perform(post("/api/entries")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());
    }

    @Test
    void testCreateEntryValidationFail() throws Exception {
        Entry invalid = new Entry(null, "", null);

        mockMvc.perform(post("/api/entries")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalid)))
                .andExpect(status().isBadRequest());
    }

    /* ---------- UPDATE ---------- */
    @Test
    void testUpdateEntrySuccess() throws Exception {
        when(featureConfig.isUpdateEnabled()).thenReturn(true);

        Entry request = new Entry(800.0, "Updated", LocalDate.parse("2025-12-20"));
        Entry updated = new Entry(800.0, "Updated", LocalDate.parse("2025-12-20"));
        updated.setId(1L);

        when(entryService.updateEntry(eq(1L), any())).thenReturn(updated);

        mockMvc.perform(put("/api/entries/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }

    @Test
    void testUpdateEntryNotFound() throws Exception {
        when(featureConfig.isUpdateEnabled()).thenReturn(true);

        Entry request = new Entry(800.0, "Updated", LocalDate.parse("2025-12-20"));

        when(entryService.updateEntry(eq(99L), any())).thenReturn(null);

        mockMvc.perform(put("/api/entries/99")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound());
    }

    @Test
    void testUpdateEntryFeatureDisabled() throws Exception {
        when(featureConfig.isUpdateEnabled()).thenReturn(false);

        Entry request = new Entry(900.0, "Blocked", LocalDate.parse("2025-12-25"));

        mockMvc.perform(put("/api/entries/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotImplemented());
    }

    /* ---------- DELETE ---------- */
    @Test
    void testDeleteEntrySuccess() throws Exception {
        when(entryService.deleteEntry(1L)).thenReturn(true);

        mockMvc.perform(delete("/api/entries/1"))
                .andExpect(status().isOk());
    }

    @Test
    void testDeleteEntryNotFound() throws Exception {
        when(entryService.deleteEntry(99L)).thenReturn(false);

        mockMvc.perform(delete("/api/entries/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testDeleteAllEntriesSuccess() throws Exception {
        when(featureConfig.isDeleteAllEnabled()).thenReturn(true);

        mockMvc.perform(delete("/api/entries"))
                .andExpect(status().isOk());
    }

    @Test
    void testDeleteAllEntriesFeatureDisabled() throws Exception {
        when(featureConfig.isDeleteAllEnabled()).thenReturn(false);

        mockMvc.perform(delete("/api/entries"))
                .andExpect(status().isNotImplemented());
    }
}
